export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            FeedDiretor: undefined;
            Main: undefined;
            EscolaDiretor: undefined;
            AnosTurmasDiretor: undefined;
            ProfessorDiretor: undefined; // Adicionado
            AdicionarProfessor: undefined; // Adicionado
            PainelProfessor: undefined; // Adicionado
            AlunosDiretor: undefined;
            AdicionarAluno: undefined
            DetalhesAluno: { aluno: any };
            Avisos: undefined;
            Reuniao: undefined;
            Ponto: undefined;
            Cronograma: undefined;
            alunoturma: undefined;
            DetalhesProfessor: { professor: any }; // Adicionado
            Suporte: undefined;
            Presenca: undefined;
        }
    }
}