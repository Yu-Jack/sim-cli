package cmd

import (
	"github.com/Yu-Jack/sim-gui/pkg/server"
	"github.com/spf13/cobra"
)

var (
	serverAddr string
	dataDir    string
	dev        bool
)

func init() {
	serverCmd.Flags().StringVar(&serverAddr, "addr", ":8080", "address to listen on")
	serverCmd.Flags().StringVar(&dataDir, "data-dir", "./data", "directory to store data")
	serverCmd.Flags().BoolVar(&dev, "dev", false, "enable dev mode (do not serve static files)")
	rootCmd.AddCommand(serverCmd)
}

var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Start the diagnostic UI server",
	RunE: func(cmd *cobra.Command, args []string) error {
		return server.Run(serverAddr, dataDir, dev)
	},
}
