import React from 'react'
import { Grid, Card, CardActionArea, CardActions, CardContent } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const RoomLoading = () => {
  return (
    <>
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
      >
        <Card>
          <CardActionArea>
            <Skeleton height={140} />
            <CardContent >
              <Skeleton
                height={12}
                variant="rect"
                width="30%"
              />
              <Skeleton
                height={10}
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Skeleton
              width="20%"
            />
            <Skeleton
              width="20%"
            />
          </CardActions>
        </Card>
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
      >
        <Card >
          <CardActionArea>
            <Skeleton height={140} />
            <CardContent >
              <Skeleton
                height={12}
                variant="rect"
                width="30%"
              />
              <Skeleton
                height={10}
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Skeleton
              width="20%"
            />
            <Skeleton
              width="20%"
            />
          </CardActions>
        </Card>
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
      >
        <Card>
          <CardActionArea>
            <Skeleton height={140} />
            <CardContent >
              <Skeleton
                height={12}
                variant="rect"
                width="30%"
              />
              <Skeleton
                height={10}
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Skeleton
              width="20%"
            />
            <Skeleton
              width="20%"
            />
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default RoomLoading
