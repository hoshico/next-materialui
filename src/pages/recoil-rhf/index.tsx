import { NextPage } from 'next';
import { RecoilRoot } from 'recoil';
import { useRecoilState} from "recoil";
import { userState } from 'store/userState';

interface Props {}

const RecoilRhf: NextPage<Props> = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <RecoilRoot>
      <p>{user.user}</p>
    </RecoilRoot>
  );
};

export default RecoilRhf;
