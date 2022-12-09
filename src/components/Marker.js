const Marker = props => {

    console.log("details : ", props.details)

    const defaultMarker = () => {
        return (
            <>

                <div className={`canvas-dot ${props.hover}`} style={{ left: `${props.left}%`, top: `${props.top}%` }} title={props.details.title}></div>

            </>
        )
    }

    const tooltip = () => {
        return (
            <>

                <div className={`canvas-dot tooltip ${props.hover}`} style={{ left: `${props.left}%`, top: `${props.top}%` }} title={props.details.title}>
                    <div className="tooltip-content">
                        <h4>{props.details.title}</h4>
                        <p>{props.details.description}</p>
                    </div>
                </div>

            </>
        )
    }

    if (props.type === "tooltip") {
        return tooltip()
    }
    return defaultMarker()

}

export default Marker
