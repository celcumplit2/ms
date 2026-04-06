import {StackHandler} from '@stackframe/stack';
import {stackServerApp} from '@/modules/stack/server';

export default function Handler(props: unknown) {
    return <StackHandler fullPage app={stackServerApp} routeProps={props}/>;
}
