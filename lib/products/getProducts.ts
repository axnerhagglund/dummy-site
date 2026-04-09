import { supabase } from "../supabase/client";

// Typdefinition för våra produkter i databasen
// Denna säkerställer att vi alltid får rätt egenskaper tillbaka på våra TypeScript-objekt
export interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category: string;
  sizes?: string[]; 
  gender?: string;
  description?: string;
  created_at?: string;
}

/**
 * Hämtar alla produkter från Supabase "products"-tabell
 * Returnerar en array av `Product` eller en tom array vid fel
 */
export async function getProducts(): Promise<Product[]> {
  try {
    // Gör anropet mot Supabase för att hämta allt från `products` tabellen
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      // Valfritt: .limit(20) om du vill bestämma hur många som hämtas max

    if (error) {
      console.error("Fel vid hämtning av produkter från Supabase:", error.message);
      return []; // Returnera tom array om ett fel inträffar, så appen inte kraschar
    }

    // Mappa över datan och bygg den fullständiga Storage URL:en för publika bucket "product_images"
    const parsedProducts = (products as Product[]).map((product) => {
      let finalImageUrl = product.image_url;

      // Om det bara är ett filnamn och url saknar "http" bygger vi den dynamiskt
      if (finalImageUrl && !finalImageUrl.startsWith("http")) {
        const { data } = supabase.storage
          .from("product_images")
          .getPublicUrl(`product_images/${finalImageUrl}`);
        
        finalImageUrl = data.publicUrl;
      }

      return {
        ...product,
        image_url: finalImageUrl,
      };
    });

    return parsedProducts;
  } catch (err) {
    console.error("Oväntat fel i getProducts:", err);
    return [];
  }
}
