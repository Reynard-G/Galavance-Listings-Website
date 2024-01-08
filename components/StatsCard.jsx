import { Group, Paper, Text } from '@mantine/core';

import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import SouthEastRoundedIcon from '@mui/icons-material/SouthEastRounded';

const StatsCard = ({ title, description, value, difference, icon, format = (value) => value }) => {
  return (
    <Paper p="md" radius="md" key={title} className="!bg-neutral-800 shadow-md">
      <Group justify="space-between">
        <Text size="xs" c="dark.4" className="!font-bold !uppercase">
          {title}
        </Text>
        {icon}
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text className="!text-2xl !font-bold">{format(value)}</Text>
        <Text c={difference >= 0 ? 'teal' : 'red'} fz="sm" fw={500} className="flex items-center">
          <span>{difference}%</span>
          {difference >= 0 ? <NorthEastRoundedIcon fontSize="1rem" style={{ stroke: 1.5 }} /> : <SouthEastRoundedIcon fontSize="1rem" style={{ stroke: 1.5 }} /> }
        </Text>
      </Group>

      <Text fz="xs" c="dark.4" mt={7}>
        {description}
      </Text>
    </Paper>
  );
};

export default StatsCard;