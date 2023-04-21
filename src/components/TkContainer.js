import { Container } from "reactstrap";
import Proptypes from "prop-types";
function TkContainer({ className, fluid, children }) {
  return (
    <Container className={className} fluid={fluid}>
      {children}
    </Container>
  );
}

TkContainer.propTypes = {
  className: Proptypes.string,
  fluid: Proptypes.bool,
};

export default TkContainer;
