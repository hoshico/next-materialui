import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import useSWR from "swr";

const sleep = (waitTime: number): void => {
  new Promise( resolve => setTimeout(resolve, waitTime))
};
const Swr = () => {
  const {data: dataA} = useSWR("testA", async () => {
    await sleep(1000);
    return {
      firstName: "DATA_A"
    }
  })
  const formA = useForm({
    defaultValues: dataA
  });
  const fetchData = () => {
    formA.reset(dataA);
  };
  return (
    <>
      <form>
        <input {...formA.register('firstName')} placeholder="First Name"/>
      </form>
      <Button onClick={fetchData}>送信</Button>
    </>
  )
};
export default Swr;