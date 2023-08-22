import Posts from 'components/posts';
import { NextPage } from 'next';

interface Props {}

const index: NextPage<Props> = () => {
  return (
    <Posts />
  )
};

export default index;