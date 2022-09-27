import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material"

const PhaseCard = () => {
  return (
    <Card key={index} sx={{ minWidth: 250, marginRight: 2, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {phase.name}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 1 }}>
          <Typography color="text.secondary">入力者</Typography>
          {phase.input.map((user, index) => (
            <Chip key={index} label={user.displayName} />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 1 }}>
          <Typography color="text.secondary">承認者</Typography>
          {phase.approval.map((user, index) => (
            <Chip key={index} label={user.displayName} />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEditPhase(flow.phases, index)}>
          編集
        </Button>
      </CardActions>
    </Card>
  )
}
export default PhaseCard
