import dal from "../assets/dal.jpeg";
import { type Product as ProductType } from "../api/products";

export const Product = ({ product }: { product: ProductType }) => {
  // on tapping kbd change its value to Kg

  const denominations: string[] = ["Gm", "Kg", "Ltr", "Pcs"];

  const handleKbdClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const kbdElement = event.currentTarget;
    const currentIndex = denominations.indexOf(kbdElement.textContent || "");
    const nextIndex = (currentIndex + 1) % denominations.length;
    kbdElement.textContent = denominations[nextIndex];
    kbdElement.className = `kbd kbd-sm kbd-${denominations[
      nextIndex
    ].toLowerCase()}`;
  };

  return (
    <li className="list-row justify-between items-center p-2 flex gap-3">
      <div>
        <img className="size-15 rounded-box" src={dal} />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div>{product.name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {product.category}
        </div>
      </div>
      <label className="input m-0 p-1 w-1/2">
        <input type="text" placeholder="Enter Quantity" className="input" />
        <kbd className="kbd kbd-sm" onClick={handleKbdClick}>
          {product.unit || "Kg"}
        </kbd>
      </label>
    </li>
  );
};
