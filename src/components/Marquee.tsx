import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import React from "react";

interface Product {
  id: number;
  nameBn: string;
  today: number;
  unit: string;
  categoryIcon: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const data: Product[] = await res.json();
  
  return (
    <div className="border-b border-base-300 bg-base-100 py-3">
      <MarqueeText className="py-1" direction="right" duration={10}
      pauseOnHover={true}>
        {data.map((product) => (
          <span
            key={product.id}
            className="mx-5 inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>{product.categoryIcon}</span>

            <span className="font-semibold">
              {product.nameBn}
            </span>

            <span>
              {product.today} টাকা/{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-error"
                  : "font-semibold text-success"
              }
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {product.change.pct}%
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;