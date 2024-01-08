import { Progress, Box, Text, Group, Paper, SimpleGrid, rem } from '@mantine/core';

import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import SouthEastRoundedIcon from '@mui/icons-material/SouthEastRounded';

const StatsSegmentsCard = ({ description, values, difference, icon, format = (value) => value }) => {
  const total = values.reduce((acc, curr) => acc + curr.value, 0);

  const segments = values.map((segment) => (
    <Progress.Section value={Math.ceil(segment.value / total * 100)} color={segment.color} key={segment.color}>
      {(segment.value >= total * 0.1 && segment.value != 0) && <Progress.Label>{(segment.value / total * 100).toFixed(2)}%</Progress.Label>}
    </Progress.Section>
  ));

  const descriptions = values.map((stat) => (
    <Box key={stat.label} style={{ borderBottomColor: stat.color }} className="border-b-4 border-solid border-gray-300 pb-1">
      <Text tt="uppercase" fz="xs" c="dark.4" fw={700}>
        {stat.label}
      </Text>

      <Group justify="space-between" align="flex-end" gap={0}>
        <Text fw={700}>{format(stat.value)}</Text>
        <Text c={stat.color} fw={700} size="sm" className="leading-5">
          {(stat.value >= total * 0.1 && stat.value != 0) ? `${(stat.value / total * 100).toFixed(2)}%` : ''}
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper p="md" radius="md" className="!bg-neutral-800">
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            {format(total)}
          </Text>
          <Text c={difference >= 0 ? 'teal' : 'red'} className="flex !items-center align-text-bottom" fz="sm" fw={700}>
            <span>{difference}%</span>
            { difference >= 0 ? <NorthEastRoundedIcon fontSize="1rem" style={{ marginBottom: rem(4), stroke: 1.5 }} /> : <SouthEastRoundedIcon fontSize="1rem" style={{ marginBottom: rem(4), stroke: 1.5 }} /> }
          </Text>
        </Group>
        {icon}
      </Group>

      <Text c="dark.4" fz="sm">
        {description}
      </Text>

      <Progress.Root size={34} classNames="leading-none text-sm" mt="sm">
        {segments}
      </Progress.Root>
      <SimpleGrid cols={{ base: 1, xs: values.length }} mt="sm">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}

export default StatsSegmentsCard;