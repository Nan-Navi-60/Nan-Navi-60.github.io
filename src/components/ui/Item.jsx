export function Item({ subTitle, children }) {
    return(
        <div className="detail-item">
            {subTitle !== 'null' && <h3>{subTitle}</h3>}
            {children}
        </div>
    )
} 