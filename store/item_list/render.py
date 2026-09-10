from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (BaseDocTemplate, Frame, PageBreak, PageTemplate,
                                Paragraph, Table, TableStyle)

from store.item_list.constants import (BANNER_FILL, BANNER_FONT, BANNER_HEIGHT,
                                       BANNER_SIZE, BODY_FONT, BORDER,
                                       CELL_PADDING, COLUMN_UNITS, GRID_WIDTH,
                                       HEADER_SIZE, ITEM_SIZE, LIST_NAME,
                                       MARGIN, MIN_SIZE, NAME_HEADER,
                                       PAGE_SIZE, PAIRS_PER_PAGE, ROW_HEIGHT,
                                       SHOP_NAME, SIZE_STEP, SUBTITLE_FILL,
                                       SUBTITLE_HEIGHT, SUBTITLE_SIZE,
                                       TITLE_STYLE, WEIGHT_FONT, WEIGHT_HEADER)


def fitted_size(text, width, font=BODY_FONT, size=ITEM_SIZE):
    usable = width - 2 * CELL_PADDING
    while size > MIN_SIZE and stringWidth(text, font, size) > usable:
        size -= SIZE_STEP
    return size


class Cell:
    def __init__(self, kind, text="", color=""):
        self.kind = kind
        self.text = text
        self.color = color


def rows_per_column(page_height=PAGE_SIZE[1]):
    usable = page_height - 2 * MARGIN - BANNER_HEIGHT - SUBTITLE_HEIGHT
    return int(usable // ROW_HEIGHT)


def lay_out(blocks, rows):
    columns = {}

    def cells(index):
        return columns.setdefault(index, [])

    cursor = 0
    for block in blocks:
        cursor = max(cursor, block.column - 1)
        remaining = list(block.items)
        titled = False

        while remaining:
            needed = 1 if titled else 2
            if rows - len(cells(cursor)) <= needed:
                cursor += 1
                continue
            if not titled:
                cells(cursor).append(Cell("title", block.title, block.color))
                titled = True
            cells(cursor).append(Cell("header"))
            free = rows - len(cells(cursor))
            chunk, remaining = remaining[:free], remaining[free:]
            cells(cursor).extend(Cell("item", text, block.color) for text in chunk)
            if remaining:
                cursor += 1

        if len(cells(cursor)) < rows:
            cells(cursor).append(Cell("gap", "", block.color))

    for column in columns.values():
        trailing = column[-1].color if column else ""
        while len(column) < rows:
            column.append(Cell("gap", "", trailing))

    return [columns.get(i, [Cell("gap") for _ in range(rows)])
            for i in range(max(columns) + 1)]


def page_tables(columns, rows, width):
    pages = []
    for start in range(0, len(columns), PAIRS_PER_PAGE):
        group = columns[start:start + PAIRS_PER_PAGE]
        while len(group) < PAIRS_PER_PAGE:
            group.append([Cell("gap") for _ in range(rows)])

        units = COLUMN_UNITS[min(start // PAIRS_PER_PAGE, len(COLUMN_UNITS) - 1)]
        total = sum(name + wgt for name, wgt in units)
        widths = []
        for name, wgt in units:
            widths.extend([width * name / total, width * wgt / total])

        data = [[SHOP_NAME, "", "", "", "", ""], [LIST_NAME, "", "", "", "", ""]]
        style = [
            ("GRID", (0, 0), (-1, -1), GRID_WIDTH, BORDER),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("FONTNAME", (0, 0), (-1, -1), BODY_FONT),
            ("FONTSIZE", (0, 2), (-1, -1), ITEM_SIZE),
            ("LEFTPADDING", (0, 2), (-1, -1), CELL_PADDING),
            ("RIGHTPADDING", (0, 2), (-1, -1), CELL_PADDING),
            ("TOPPADDING", (0, 2), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 2), (-1, -1), 0),
            ("SPAN", (0, 0), (5, 0)),
            ("SPAN", (0, 1), (5, 1)),
            ("BACKGROUND", (0, 0), (5, 0), BANNER_FILL),
            ("BACKGROUND", (0, 1), (5, 1), SUBTITLE_FILL),
            ("FONTNAME", (0, 0), (5, 1), BANNER_FONT),
            ("FONTSIZE", (0, 0), (5, 0), BANNER_SIZE),
            ("FONTSIZE", (0, 1), (5, 1), SUBTITLE_SIZE),
        ]

        for index in range(rows):
            data.append(["", "", "", "", "", ""])

        for pair, column in enumerate(group):
            name_col, wgt_col = pair * 2, pair * 2 + 1
            for index, cell in enumerate(column):
                row = index + 2
                fill = colors.HexColor(cell.color) if cell.color else None

                if cell.kind == "title":
                    data[row][name_col] = Paragraph(
                        f"<u>{escape(cell.text)}</u>", TITLE_STYLE
                    )
                    style.append(("SPAN", (name_col, row), (wgt_col, row)))
                    if fill:
                        style.append(
                            ("BACKGROUND", (name_col, row), (wgt_col, row), fill)
                        )
                elif cell.kind == "header":
                    data[row][name_col] = NAME_HEADER
                    data[row][wgt_col] = WEIGHT_HEADER
                    style.append(
                        ("FONTSIZE", (name_col, row), (wgt_col, row), HEADER_SIZE)
                    )
                    style.append(
                        ("FONTNAME", (wgt_col, row), (wgt_col, row), WEIGHT_FONT)
                    )
                else:
                    data[row][name_col] = cell.text
                    if fill:
                        style.append(
                            ("BACKGROUND", (name_col, row), (name_col, row), fill)
                        )
                    size = fitted_size(cell.text, widths[name_col])
                    if size < ITEM_SIZE:
                        style.append(
                            ("FONTSIZE", (name_col, row), (name_col, row), size)
                        )

        heights = [BANNER_HEIGHT, SUBTITLE_HEIGHT] + [ROW_HEIGHT] * rows
        table = Table(data, colWidths=widths, rowHeights=heights, repeatRows=0)
        table.setStyle(TableStyle(style))
        pages.append(table)

    return pages


def render(blocks, target):
    width = PAGE_SIZE[0] - 2 * MARGIN
    height = PAGE_SIZE[1] - 2 * MARGIN

    document = BaseDocTemplate(target, pagesize=PAGE_SIZE, title=LIST_NAME)
    frame = Frame(
        MARGIN, MARGIN, width, height,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    document.addPageTemplates([PageTemplate(id="item-list", frames=[frame])])

    rows = rows_per_column()
    columns = lay_out(blocks, rows)
    tables = page_tables(columns, rows, width)

    story = []
    for index, table in enumerate(tables):
        story.append(table)
        if index < len(tables) - 1:
            story.append(PageBreak())
    document.build(story)
    return len(tables)
