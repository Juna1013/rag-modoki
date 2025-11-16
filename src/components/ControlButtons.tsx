import Button from "@mui/material/Button";

type Props = {
    nextAction: () => void;
};

const ControlButtons = ({ nextAction }: Props) => (
    <div className="w-full flex justify-center gap-4 mt-6">
        {/* 次の問題へのボタン */}
        <Button
            variant="contained"
            color="primary"
            onClick={nextAction}
            className="min-w-[200px] font-bold text-sm"
        >
            次の問題へ
        </Button>
    </div>
);

export default ControlButtons;
