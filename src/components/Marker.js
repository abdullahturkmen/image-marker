const Marker = props => {

    console.log("details : ", props.details)

    const defaultMarker = () => {
        return (
            <>

                <div className={`canvas-dot ${props.hover}`} style={{ left: `${props.left}%`, top: `${props.top}%` }} title={props.details.title}></div>

            </>
        )
    }

    const xyz = () => {
        return (
            <>

                <div className={`canvas-dot ${props.hover}`} style={{ left: `${props.left}%`, top: `${props.top}%` }} title={props.details.title}></div>

            </>
        )
    }

    if (props.type === "xyz") {
        return xyz()
    }
    return defaultMarker()

}

export default Marker
