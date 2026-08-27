import type { GarmentType } from "@/lib/garments";

export type Category = "Bluza" | "Veshje të Jashtme" | "Fustane" | "Pantallona";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  garment: GarmentType;
  color: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Bluzë e Trashë",
    price: 38,
    category: "Bluza",
    garment: "tee",
    color: "text-stone-800",
    isNew: true,
  },
  {
    id: "p2",
    name: "Hoodie Studio",
    price: 78,
    category: "Bluza",
    garment: "hoodie",
    color: "text-rust",
    isNew: true,
  },
  {
    id: "p3",
    name: "Pallto Leshi",
    price: 228,
    category: "Veshje të Jashtme",
    garment: "jacket",
    color: "text-neutral-900",
  },
  {
    id: "p4",
    name: "Fustan Slip Midi",
    price: 118,
    category: "Fustane",
    garment: "dress",
    color: "text-rose-800",
    isNew: true,
  },
  {
    id: "p5",
    name: "Fund i Palosur",
    price: 68,
    category: "Pantallona",
    garment: "skirt",
    color: "text-olive",
  },
  {
    id: "p6",
    name: "Pantallona të Përshtatura",
    price: 92,
    category: "Pantallona",
    garment: "trousers",
    color: "text-stone-700",
  },
  {
    id: "p7",
    name: "Triko Merino",
    price: 86,
    category: "Bluza",
    garment: "sweater",
    color: "text-amber-800",
  },
  {
    id: "p8",
    name: "Xhaketë Xhins",
    price: 108,
    category: "Veshje të Jashtme",
    garment: "jacket",
    color: "text-sky-900",
    isNew: true,
  },
  {
    id: "p9",
    name: "Fustan Kolonë",
    price: 134,
    category: "Fustane",
    garment: "dress",
    color: "text-indigo-950",
  },
  {
    id: "p10",
    name: "Bluzë e Përditshme",
    price: 34,
    category: "Bluza",
    garment: "tee",
    color: "text-emerald-900",
  },
  {
    id: "p11",
    name: "Bluzë e Përditshme",
    price: 34,
    category: "Bluza",
    garment: "tee",
    color: "text-emerald-900",
  },
  {
    id: "p12",
    name: "Bluzë e Përditshme",
    price: 64,
    category: "Bluza",
    garment: "tee",
    color: "text-emerald-900",
  },
  {
    id: "p13",
    name: "Bluzë e Përditshme",
    price: 54,
    category: "Bluza",
    garment: "tee",
    color: "text-emerald-900",
  },
];
