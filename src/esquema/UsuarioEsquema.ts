import { model, Schema,Types} from "mongoose";
import UsuarioEntidad from "../entidad/UsuarioEntidad";

const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuario:{ type:String,required:true,trim:true,},
    estadoUsuario: { type: Number, enum: [1, 2], default: 1 },
    correoUsuario: { type:String, require:true, unique:true },
    claveUSuario: { type:String, require:true },
    fechaUsuario: { type:Date, default:Date,now()},
    codUsuario: { type:Types.ObjectId, ref:"Perfil", require:true}
  },
  { 
    versionKey: false,
  }
);

export default model("Usuario", UsuarioEsquema, "Usuario");


