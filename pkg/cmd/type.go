package cmd

import (
	"context"

	"github.com/Yu-Jack/sim-gui/pkg/docker"
)

type Simulator struct {
	Name         string
	BundlePath   string
	Status       string
	Port         int
	Ctx          context.Context
	Image        string
	DockerClient docker.Client
}
