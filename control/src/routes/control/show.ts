import express, { Request, Response } from 'express';
import { NotFoundError, BadRequestError } from '@vboxdev/common';
import { Control } from '../../models/control';

const router = express.Router();

router.get('/api/control/:conId', async (req: Request, res: Response) => {
  const control = await Control.findById(req.params.conId);

  if (!control) {
    console.log("Cannot find control Id");
    
    throw new BadRequestError("Cannot find control Id");
  }

  res.send(control);
});

export { router as controlShowRouter };
