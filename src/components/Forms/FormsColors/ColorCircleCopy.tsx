import { Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ColorCircleCopyProps {
    color: string;
}

const ColorCircleCopy = ({ color }: ColorCircleCopyProps) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(color);
        } catch (e) {
            // fallback para browsers antigos
            const textarea = document.createElement('textarea');
            textarea.value = color;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    };

    return (
        <Tooltip title={`Copiar cor: ${color}`}>
            <IconButton onClick={handleCopy} size="small" sx={{ p: 0.5 }}>
                <span
                    style={{
                        display: 'inline-block',
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: color,
                        border: '1px solid #cbd5e1',
                        marginRight: 8,
                    }}
                />
                <ContentCopyIcon sx={{ fontSize: 16, color: '#64748b' }} />
            </IconButton>
        </Tooltip>
    );
};

export default ColorCircleCopy;