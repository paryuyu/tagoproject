import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function FinalChkList({ item }) {


    
    return (<>
        {item &&
            <>
              
                {item.flag === 'delete' &&
                    <Box className={"modal-itembox"}>
                        <Typography>삭제</Typography>
                        <Typography>{item.depAirportNm}</Typography>
                        <Typography>{item.depAirportNm}</Typography>
                        <Typography>{item.arrPlandTime}</Typography>
                        <Typography>{item.depPlandTime}</Typography>
                    </Box>
                }

                {item.flag === 'update' &&
                    <Box className={"modal-itembox"}>
                        <Typography>수정</Typography>
                        <Typography>{item.depAirportNm}</Typography>
                        <Typography>{item.depAirportNm}</Typography>
                        <Typography>{item.arrPlandTime}</Typography>
                        <Typography>{item.depPlandTime}</Typography>
                    </Box>
                }

                {item.flag === 'add' &&
                    <Box className={"modal-itembox"}>
                        <Typography>추가</Typography>
                        <Typography>{item.depAirportNm}</Typography>
                        <Typography>{item.depAirportNm}</Typography>
                        <Typography>{item.arrPlandTime}</Typography>
                        <Typography>{item.depPlandTime}</Typography>
                    </Box>
                }
                
            </>
      }
    </>);
}

export default FinalChkList;