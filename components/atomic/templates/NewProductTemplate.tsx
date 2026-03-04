import { Text } from "../atoms";
import { Container } from "../organisms";
import NewItemForm from "../organisms/NewItemForm";
import { ItemCategory, ItemCity } from "@/types";

interface NewProductTemplateProps {
  categories?: ItemCategory[];
  cities?: ItemCity[];
}

const NewProductTemplate = ({
  categories = [],
  cities = [],
}: NewProductTemplateProps) => {
  return (
    <Container>
      <section className="mt-[80px] w-full">
        <NewItemForm type="post" categories={categories} cities={cities} />
      </section>
    </Container>
  );
};

export default NewProductTemplate;
