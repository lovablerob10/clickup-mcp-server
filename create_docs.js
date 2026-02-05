const { ClickUpService } = require('./dist/services/clickup.service.js');

async function run() {
    const service = new ClickUpService();
    const workspaceId = '90132645314';
    const spaceId = '901312834269';

    try {
        // 1. Create the main Doc
        console.log('Creating main document...');
        const doc = await service.docService.createDoc({
            workspace_id: workspaceId,
            name: 'Manual do cliente - spHAUS',
            parent: {
                id: spaceId,
                type: 4 // Space
            }
        });
        console.log('Doc created:', doc.id);

        // 2. Create "Tom de Voz" page
        console.log('Creating Tom de Voz page...');
        await service.docService.createDocPage({
            workspace_id: workspaceId,
            doc_id: doc.id,
            name: 'Tom de Voz',
            content: `## Tom de Voz spHAUS\n\n**Elegante, autêntico e focado em design/experiência.**\n\nO tom deve ser sofisticado, mas acolhedor. Buscamos criar experiências memoráveis através de uma arquitetura autoral.`
        });

        // 3. Create "Histórias Autênticas" page
        console.log('Creating Histórias Autênticas page...');
        await service.docService.createDocPage({
            workspace_id: workspaceId,
            doc_id: doc.id,
            name: 'Histórias Autênticas',
            content: `## Histórias Autênticas (Pilar Principal)\n\n**Objetivo**: Autoridade + Prova Social + Desejo.\n\n**Função**: Mostrar cases de marcas que escolhem a spHAUS porque o espaço eleva a experiência.`
        });

        console.log('All documents created successfully!');
    } catch (error) {
        console.error('Error creating documents:', error);
    }
}

run();
