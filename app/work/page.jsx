import Footer from "@/components/Footer";
import WorkGallery from "@/components/WorkGallery";
import { getWorkImages } from "@/lib/getWorkImages";

export const metadata = {
  title: "Work | Yazan Hamarneh",
  description: "Selected work by Yazan Hamarneh."
};

export default async function WorkPage() {
  const images = await getWorkImages();

  return (
    <>
      <WorkGallery images={images} />
      <Footer />
    </>
  );
}
