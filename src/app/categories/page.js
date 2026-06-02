import BannerComponent from "@/components/HeaderScreen/BannerComponent";
import CategoryScreen from "@/components/HeaderScreen/CategoryScreen";
import CategorySlider from "@/components/HeaderScreen/Categoryslider";

export const metadata = {
  title: "All Categories | Helpaana",
  description: "Explore all Helpaana service categories in one place.",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="w-full" aria-label="Service categories carousel">
        <CategorySlider />
      </section>

      <section className="w-full" aria-label="Promotional banners">
        <BannerComponent />
      </section>

      <section className="py-8 md:py-16" aria-label="Browse all service categories">
        <CategoryScreen mode="full" />
      </section>
    </main>
  );
}
