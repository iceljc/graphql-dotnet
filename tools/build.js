import yargs from 'yargs';
import {
  artifacts,
  compile,
  fixie,
  getTasks,
  nuget,
  nuspec,
  restore,
  runSerial,
  settings,
  setVersion,
  version
} from './tasks';

const args = yargs
  .default('t', 'default')
  .alias('t', 'target')
  .argv;

function buildNuspec() {
  return nuspec({
    file: './nuget/GraphQL.nuspec',
    id: 'GraphQL',
    description: 'GraphQL for .NET',
    version: settings.version,
    authors: 'Joseph T. McBride',
    owners: 'Joseph T. McBride',
    licenseUrl: 'https://github.com/graphql-dotnet/graphql-dotnet/blob/master/LICENSE.md',
    projectUrl: 'https://github.com/graphql-dotnet/graphql-dotnet',
    tags: 'GraphQL json api',
    releaseNotes:
      '* Nuget package structure has changed - the DLLs now reside in a net45 folder\n' +
      '* Created new build process to help expedite deployment of new versions\n' +
      '* Fixed a bug where type names with beginning or ending spaces would not get resolved'
  });
}

const tasks = {
  artifacts: ['nuspec', 'nuget', artifacts],
  compile: ['restore', compile],
  test: fixie,
  version,
  nuspec: buildNuspec,
  nuget,
  restore,
  setVersion: () => setVersion(args._[0]),
  'default': 'compile test',
  ci: 'version default artifacts'
};

runSerial(getTasks(tasks, args.target));
