
import react from 'react';
// import data from "./tmp.html"
import data from "./tmp.html.js"
function tmp() {
    return(
        <div>
            <iframe
                title={'tmp'}
                srcDoc={data}
                style={{width:'100%',border:'0px'}}
                scrolling={"auto"}
            />
        </div>

    )
}
export default tmp;
