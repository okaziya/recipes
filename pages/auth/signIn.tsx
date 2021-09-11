import {signInWidthGoogle} from "../../config/firebase";
import Button from "../../components/ui/button";

//TODO: add signInForm

export default function SignIn() {
    return <Button onClick={signInWidthGoogle}>Sign in width Google</Button>
}