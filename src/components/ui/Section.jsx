export function Section({ title, children }) {
    return(
        <div className="detail-section">
            <div className="detail-sub-title">
                <h2>{title}</h2>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}