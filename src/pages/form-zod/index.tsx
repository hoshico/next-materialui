import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

const Schema = z.object({
  name: z.string()
        .min(1, "名前を入力してください。")
        .min(4, "4文字以上で入力してください。")
})

const FormZod = () => {
  return (
    <>

    </>
  )
};
export default FormZod;