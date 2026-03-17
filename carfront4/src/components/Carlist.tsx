// components/carlist.tsx
import { useQuery , useMutation, useQueryClient} from "@tanstack/react-query";
import {getCars, deleteCar} from '../api/carapi'
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {  Snackbar, Button, IconButton, Tooltip, Stack } from '@mui/material';
import { DeleteForeverRounded } from "@mui/icons-material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

type CarlistProps = {
  logout? : () => void;
}

export default function Carlist({logout}:CarlistProps){//
  const queryClient = useQueryClient();
  const [open,setOpen] = useState(false);

  const columns: GridColDef[] = [
    {field: 'brand', headerName: '브랜드', width:100,},
    {field: 'model', headerName: '모델', width:100},
    {field: 'color', headerName: '색깔', width:100},
    {field: 'registrationNumber', headerName: '등록번호', width:100},
    {field: 'modelYear', headerName: '제작년도', width:100},
    {field: 'price', headerName: '가격', width:100},
    {
      field : 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row}/>
    }
    ,
    {
      field: 'delete',
      headerName: '',
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (//GridCellParams의 아래에 있는 row,
        <Tooltip title='delete car'>
          <IconButton aria-label="delete" size="small"
          onClick={() => {
            if(confirm(`${params.row.brand}의 ${params.row.color} ${params.row.model}을 삭제하겠습니까?`))
          {
            mutate(params.row._links.self.href)
          }
        }}
        >
            <DeleteForeverRounded/>
          </IconButton>
        </Tooltip>
      )
    }
  ]//배열, 자꾸 헷갈려서 리스트라 적었는데
  const { data, error, isSuccess } = useQuery({
      queryKey: ['cars'],
      queryFn: getCars
  })

  const {mutate} = useMutation(deleteCar,{
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['cars']}); // 쿼리 무효화, useQuery는 캐싱과 매우 밀접한 연관이 있는데, 캐시에 삭제된 정보가 계속 남아있기 때문에 쿼리를 무효화 할 필요가있다.
      //자동차 삭제 후 실행, 리렌더링 되게 바꾸고 싶다.
    },
    onError: err => {
      console.log(err);
    }
  }) // mutate를 이용해 호출

  if(!isSuccess){
    return <span>Loading ...</span>
  } else if(error){
    return <span> 자동차 데이터를 가져오던 중 오류가 발생했습니다.</span>
  } else {
    return(
      <>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <AddCar/>
          <Button onClick={logout}>로그아웃</Button>
        </Stack>
        {/* <AddCar/> */}
        <DataGrid
          rows={data}
          columns={columns} //car각각이 json형태로 저장된 배열
          disableRowSelectionOnClick={true} // 클릭한 라인이 파란색으로 잡히는걸 막는다.
          getRowId={row=> row._links.self.href}//고유값 집어넣어야함 ,근데 어떻게 이걸 들고 올 수 있는거지
          //row는 매개변수, 인자는 rows에 저장된 data 하나하나
          slots={{toolbar: GridToolbar}}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000} 
          onClose={() => setOpen(false)}
          message='해당 차량 정보가 삭제되었습니다.'
        />
        {/**밀리초 라 2000이면 2초다 */}
      </>
    );
  }
}
