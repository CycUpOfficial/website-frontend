import { Text } from "../atoms";
import { Container } from "../organisms";
import NewItemForm from "../organisms/NewItemForm";

const NewProductTemplate = () => {
  return (
    <Container>
      <section className="mt-[80px] w-full">
        <NewItemForm type="post" />
      </section>
    </Container>
  );
};

export default NewProductTemplate;
