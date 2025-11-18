type Props = {
    nextAction: () => void;
};

const ControlButtons = ({ nextAction }: Props) => (
    <div className="w-full flex justify-center gap-4 mt-8">
        <button
            onClick={nextAction}
            className="control-button"
        >
            次の問題へ →
        </button>
    </div>
);

export default ControlButtons;
