export default function Keyboard(props) {
    const bg = props.keyStroke.includes(props.value)
        ? props.selectedStatus.some(item => item[0] === props.value && item[1]) ? "green" : "red"
        : null;

    return (
        <button
            key={props.id}
            onClick={bg === null && props.turnsRef.current > 0 ? () => props.onClick(props) : null}
            style={{ backgroundColor: bg }}
        >
            {props.value}
        </button>
    );
}