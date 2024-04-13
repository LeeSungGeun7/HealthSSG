interface FormButton {
    loading : boolean;
    text : string ; 
}

export default function FormButton({loading ,text} : FormButton) {
    return (
        <button disabled={loading}
        className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
            {loading ? "Loading..." : text }
        </button>
    )
}