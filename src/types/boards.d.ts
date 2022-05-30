interface IBoard {
  id: string;
  title: string;
  description?: string;
}

// interface ExtendedColumn {
//   id: string;
//   title: string;
//   order: number;
//   tasks: ITask[];
// }
// interface ExtendedBoard {
//   id: string;
//   title: string;
//   description: string;
//   columns: ExtendedColumn[];
// }

// interface ExtendedBoard {
//   id: string;
//   title: string;
//   description: string;
//   columns: [
//     {
//       id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f';
//       title: 'Done';
//       order: 1;
//       tasks: [
//         {
//           id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9';
//           title: 'Task: pet the cat';
//           order: 1;
//           description: 'Domestic cat needs to be stroked gently';
//           userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8';
//           files: [
//             {
//               filename: 'foto.jpg';
//               fileSize: 6105000;
//             }
//           ];
//         }
//       ];
//     }
//   ];
// }
