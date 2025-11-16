import Button from "@mui/material/Button";

type Props = {
  choices: string[];
  onSelect: (index: number) => void;
  disabled: boolean;
};

const ChoiceButtons = ({ choices, onSelect, disabled }: Props) => (
  <div className="mt-8 flex flex-col space-y-3 w-3/4">
    {choices.map((choice, index) => (
      <Button
        key={index}
        variant="outlined"
        onClick={() => onSelect(index)}
        disabled={disabled}
        className="w-full text-left justify-start normal-case py-3 px-4"
        sx={{
          borderColor: "#1976d2",
          color: "#1976d2",
          "&:hover": {
            borderColor: "#1976d2",
            backgroundColor: "#f5faff",
          },
        }}
      >
        {index + 1}. {choice}
      </Button>
    ))}
  </div>
);

export default ChoiceButtons;
