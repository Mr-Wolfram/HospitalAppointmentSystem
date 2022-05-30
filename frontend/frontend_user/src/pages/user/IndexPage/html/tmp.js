
import React, {Component} from 'react';
// import data from "./tmp.html"
import data from "./tmp.html.js"
class tmp extends React.Component{
    render() {
        return (
            <div>
                <iframe
                    title={'tmp'}
                    srcDoc={data}
                    style={{width: '100%', border: '0px'}}
                    scrolling={"auto"}
                />
            </div>

        )
    }
}
export default tmp;
