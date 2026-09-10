from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch

SHOP_NAME = "19no KHARI BAOLI"
LIST_NAME = "ITEM LIST"
NAME_HEADER = "Item Name"
WEIGHT_HEADER = "Wgt"
SPECIALITY_PREFIX = "*"

PAGE_SIZE = letter
MARGIN = 0.4 * inch
PAIRS_PER_PAGE = 3

BANNER_HEIGHT = 24.3
SUBTITLE_HEIGHT = 22.5
ROW_HEIGHT = 14.06
CELL_PADDING = 2

COLUMN_UNITS = [
    [(18.29, 5.0), (28.14, 5.0), (22.14, 6.0)],
    [(19.57, 5.57), (19.57, 6.14), (22.43, 6.14)],
]

BANNER_FILL = colors.HexColor("#E9FF45")
SUBTITLE_FILL = colors.HexColor("#73E1F5")
BORDER = colors.HexColor("#A5A5A5")
DEFAULT_BLOCK_FILL = "#FFFFFF"
GRID_WIDTH = 0.5

BANNER_FONT = "Helvetica-Bold"
BODY_FONT = "Times-Bold"
WEIGHT_FONT = "Times-Roman"

CAP_HEIGHTS = {
    "Helvetica-Bold": 0.718,
    "Times-Bold": 0.676,
    "Times-Roman": 0.662,
}

BANNER_SIZE = 18.28
SUBTITLE_SIZE = 14.62
TITLE_SIZE = 10.97
TITLE_LEADING = 16.5
HEADER_SIZE = 10.97
ITEM_SIZE = 10.97
MIN_SIZE = 5.5
SIZE_STEP = 0.25

TITLE_STYLE = ParagraphStyle(
    "block-title",
    fontName=BODY_FONT,
    fontSize=TITLE_SIZE,
    leading=TITLE_LEADING,
    alignment=1,
)
