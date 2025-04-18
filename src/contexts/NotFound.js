
import { Link } from "react-router"

export default function NotFound()
{

return (

<>
<h1>404 (page is not Found )</h1>
<h4>this page that you are visited is not found </h4>
<Link to="/">
<button>return back to the home </button>
</Link>
</>

)

}