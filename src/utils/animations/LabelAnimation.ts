import {ILabelAnimation} from "../interfaces/ianimations/ILabelAnimation";
import {ScrService} from "../../services/ScrService";

export class LabelAnimation implements ILabelAnimation {
  constructor(private SCR: ScrService) {
  }
}
