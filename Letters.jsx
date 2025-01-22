export default function Letters(prop) {
    return(
        <div key={prop.id}>{prop.show?prop.value:""}</div>
    )
}