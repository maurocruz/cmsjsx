
import Navbar from './components/navbar/Navbar';
import ImageObject from './types/imageObject/ImageObject';
import Taxon from './types/taxon/Taxon';

const navbar = new Navbar();
const imageObject = new ImageObject();
const taxon = new Taxon();

// NAVBAR
navbar.formSearch(); // form search auto complete

// IMAGES FORMS
imageObject.Imagesfromdatabase(); // images from database
imageObject.Imagesfromserver(); // images from server

// TAXON
taxon.selectParentTaxon(); // select parent taxon