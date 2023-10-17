import classes from './ProductsSummary.module.css';
import cosmeticsImage from '../../assets/cosmetics.jpg';

const ProductsSummary = () => {
  return (
    <section className={classes.summary}>
        <img src={cosmeticsImage}
             alt={"Cosmetics image"} style={{width: "700px", borderRadius: "5px"}}/>
    </section>
  );
};

export default ProductsSummary;
