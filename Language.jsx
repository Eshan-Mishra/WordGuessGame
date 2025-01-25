export default function Language(props) {
    // console.log(props.showOverlay)


    return (
        <div className="language-div" key={props.id} style={props.style}>
            {props.value}
            {props.showOverlay && (
                <div className="overlay">
                    💀
                </div>
            )}
        </div>
    );
}