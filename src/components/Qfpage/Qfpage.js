import './style.scss'
export default (props) => {

    return (
        <div className="qfpage">
            <div className='title'>{props.title}</div>
            <>
                {props.children}
            </>
        </div>
    )
}