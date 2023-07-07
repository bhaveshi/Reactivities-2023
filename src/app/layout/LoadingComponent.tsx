import react from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

const promiseA = new Promise((resolve, reject) => {
    resolve('777');
  });

export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props){
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
};