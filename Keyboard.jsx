export default function Keyboard(props) {
    let bg ;


    if (props.keyStroke.includes(props.value)
        && props.selectedStatus.some(item => item[0] === props.value
            && item[1] === true)){
        bg="green"
    }
    else if(props.keyStroke.includes(props.value)){
        bg="red"
    }else {
        bg=true
    }

    let click

    if(bg===true && props.turnsRef.current>0){
        click="on"
    }else {
        click="off"
    }



    return (
        <button
            key={props.id}
            onClick={ click==="on"  ? () => props.onClick(props) : null}
            style={{ backgroundColor: bg !== true ? (bg === "red" ? "red" : "green") : null }}
        >
            {props.value}
        </button>
    );
}