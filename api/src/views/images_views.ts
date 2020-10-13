import Image from "../models/Image";
import Orphanage from "../models/Orphanage";

export default {
   render(image: Image) {
      return {
         id: image.id,
         url: `http://localhost:3333/uploads/${image.path}`
      }
   },

   renderMany(images: Image[]) {
      return images.map(image => this.render(image))
   }
}