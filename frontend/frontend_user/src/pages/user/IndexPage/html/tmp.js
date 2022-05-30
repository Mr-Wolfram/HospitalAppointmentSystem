
import react from 'react';
import data from "./tmp.html"
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
export default withRouter(tmp);
