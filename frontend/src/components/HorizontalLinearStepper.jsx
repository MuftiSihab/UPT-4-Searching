import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Nopel', 'Pendata', 'Kirim Badan', 'SPPT'];

export default function HorizontalLinearStepper({tahapan}) {
  
  return (
    <div>
      {
        tahapan === "pembuatan nopel" && (<Nopel/>)
      }
      {
        tahapan === "pemeriksaan pendata" && (<Pendata/>)
      }
      {
        tahapan === "pengiriman ke badan" && (<KirimBadan/>)
      }
      {
        tahapan === "SPPT jadi" && (<SPPTJadi/>)
      }
    </div> 
  );
}

const Nopel = () => {
  const activeStep = 0;
  return(
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    <hr/>
    </div>
  )
}

const Pendata = () => {
  const activeStep = 1;
  return(
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    <hr/>
    </div>
  )
}

const KirimBadan = () => {
  const activeStep = 2;
  return(
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    <hr/>
    </div>
  )
}

const SPPTJadi = () => {
  const activeStep = 4;
  return(
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    <hr/>
    </div>
  )
}